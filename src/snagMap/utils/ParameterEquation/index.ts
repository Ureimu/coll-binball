/* eslint-disable @typescript-eslint/no-unused-vars */
import { Coord } from "../../../type/pos";
const { sin, cos, PI: pi, abs, sign } = Math;
const twoPi = pi * 2;
export interface ParameterFunction {
    x: SingleParameterFunction;
    y: SingleParameterFunction;
}
export type SingleParameterFunction = (fractile: number, time: number) => number;
export class ParameterEquationList {
    public constructor(public length: number) {
        return;
    }

    public pos(index: number, timeByMs: number, parameterFunction: ParameterFunction): Coord {
        const fractile = index / this.length;
        const timeBySecond = timeByMs / 1000;
        return {
            x: parameterFunction.x(fractile, timeBySecond),
            y: parameterFunction.y(fractile, timeBySecond)
        };
    }

    /**
     * 分位数参数，在0到1之间。
     *
     * @type {ParameterFunction}
     * @memberof ParameterEquationList
     */
    public fractile: ParameterFunction = {
        x: (fractile, time) => fractile,
        y: (fractile, time) => fractile
    };

    /**
     * 时间参数，单位为秒。
     *
     * @type {ParameterFunction}
     * @memberof ParameterEquationList
     */
    public time: ParameterFunction = {
        x: (fractile, time) => time,
        y: (fractile, time) => time
    };

    /**
     * 常量，如果不指定y，则y=x。
     *
     * @memberof ParameterEquationList
     */
    public c = (x: number, y?: number): ParameterFunction => {
        const yT = typeof y === "number" ? y : x;
        return {
            x: (fractile, time) => x,
            y: (fractile, time) => yT
        };
    };

    /**
     * 圆的参数方程。
     *
     * @memberof ParameterEquationList
     */
    public circle = (radius = this.c(100), duration = this.fractile): ParameterFunction => {
        return {
            x: (fractile, time) => radius.x(fractile, time) * sin(twoPi * duration.x(fractile, time)),
            y: (fractile, time) => radius.y(fractile, time) * cos(twoPi * duration.y(fractile, time))
        };
    };

    // TODO scale, rotate, translate
    /**
     * 直线的参数方程。
     *
     * @memberof ParameterEquationList
     */
    public line = (
        point1: ParameterFunction,
        point2: ParameterFunction,
        fractilePara = this.fractile
    ): ParameterFunction => {
        return {
            x: (fractile, time) =>
                point1.x(fractile, time) +
                fractilePara.x(fractile, time) * (point2.x(fractile, time) - point1.x(fractile, time)),
            y: (fractile, time) =>
                point1.y(fractile, time) +
                fractilePara.y(fractile, time) * (point2.y(fractile, time) - point1.y(fractile, time))
        };
    };

    /**
     * 折线的参数方程。
     *
     * @memberof ParameterEquationList
     */
    public polyLine = (fractilePara: ParameterFunction, ...points: ParameterFunction[]): ParameterFunction => {
        const lineList: ParameterFunction[] = [];
        points.forEach((point, index) => {
            if (index > 0) {
                const prePoint = points[index - 1];
                const line = this.line(prePoint, point, fractilePara);
                lineList.push(line);
            }
        });
        return this.group(...lineList);
    };

    public add = (...funcList: ParameterFunction[]): ParameterFunction => {
        return {
            x: (fractile, time) => funcList.reduce((sum, func) => (sum += func.x(fractile, time)), 0),
            y: (fractile, time) => funcList.reduce((sum, func) => (sum += func.y(fractile, time)), 0)
        };
    };

    public sub = (a: ParameterFunction, b: ParameterFunction): ParameterFunction => {
        return {
            x: (fractile, time) => a.x(fractile, time) - b.x(fractile, time),
            y: (fractile, time) => a.y(fractile, time) - b.y(fractile, time)
        };
    };

    public mul = (...funcList: ParameterFunction[]): ParameterFunction => {
        return {
            x: (fractile, time) => funcList.reduce((sum, func) => (sum *= func.x(fractile, time)), 1),
            y: (fractile, time) => funcList.reduce((sum, func) => (sum *= func.y(fractile, time)), 1)
        };
    };

    public div = (a: ParameterFunction, b: ParameterFunction): ParameterFunction => {
        return {
            x: (fractile, time) => a.x(fractile, time) / b.x(fractile, time),
            y: (fractile, time) => a.y(fractile, time) / b.y(fractile, time)
        };
    };

    /**
     * 合并多个ParameterFunction，并按照同等权值分配分位数。
     *
     * @memberof ParameterEquationList
     */
    public group = (...funcList: ParameterFunction[]): ParameterFunction => {
        const length = funcList.length;
        return {
            x: (fractile, time) => {
                const supFractile = (fractile + Number.EPSILON) * length;
                const mappedIndex = Math.floor(supFractile);
                return funcList[mappedIndex].x(supFractile - mappedIndex, time);
            },
            y: (fractile, time) => {
                const supFractile = (fractile + Number.EPSILON) * length;
                const mappedIndex = Math.floor(supFractile);
                return funcList[mappedIndex].y(supFractile - mappedIndex, time);
            }
        };
    };

    public range = (length: number): number[] => new Array<number>(length).fill(0).map((val, index) => index);
}
// 2个参数，ball index, tick
