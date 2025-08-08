import { create, all } from 'mathjs'

const config = {

}

export const math = create(all, config)

export function range(start: number, end: number): Array<number> {
    return [...Array(1 + end - start).keys()].map(index => start + index)
}