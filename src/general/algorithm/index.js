import {divide, multiply, pi} from './math';

//  1° × π/180 = 0.01745rad
export function degreeToRadian(degree) {
    const unit = divide(pi, 180);
    return multiply(degree, unit);
}

export function radianToDegree(radians) {
    const unit = divide(180, pi);
    return multiply(radians, unit);
}

export * from './math';
