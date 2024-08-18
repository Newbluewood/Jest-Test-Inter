import { getScore } from "../app/Scores"

describe('getScore function test', ()=> {
    test('return for found offset', ()=> {
        const actual = getScore([{offset:10,score:{home:0, away:1}}], 10)
        expect(actual).toEqual({home:0, away:1})
    });
    test('return for not found offset', ()=> {
        const actual = getScore([{offset:10,score:{home:0, away:1}}], 11)
        expect(actual).toEqual({home:0, away:1})
    });
    test('return for negative entry of offset', ()=> {
        const actual = getScore([{offset:10,score:{home:0, away:1}}], -200)
        expect(actual).toEqual({home:0, away:0})
    });
    test('return for NaN entry', ()=> {
        const actual = getScore([{offset:10,score:{home:0, away:1}}], NaN)
        expect(actual).toEqual({home:0, away:0})
    });
    test('return for exceeded offset value', ()=> {
        const actual = getScore([{offset:150000,score:{home:2, away:1}}], 180000)
        expect(actual).toEqual({home:2, away:1})
    });
    test('return for getScore is empty', ()=> {
        const actual = getScore([], 20)
        expect(actual).toEqual({home:0, away:0})
    });

})