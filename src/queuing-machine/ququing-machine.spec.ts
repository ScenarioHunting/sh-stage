/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()

import { QueuingMachine } from "./queuing-machine";
describe('', function () {
    const theories: any[][] = [
        [1, 2, 3],
        ['one', 'two', 'three'],
    ]
    theories.forEach((tokenOrder) => {
        it('calls the first listener by starting', function () {
            let subject = new QueuingMachine(tokenOrder)
            let firstTurnHit = false
            subject.onTurn(tokenOrder[0], function () {
                firstTurnHit = true
            })

            subject.start()

            firstTurnHit.should.eq(true)
        })
    })
    it('calls the second listener as the first one is done', function () {
        const tokenOrder = theories[0]
        let subject = new QueuingMachine(tokenOrder)
        
        let turnHit = false
        subject.onTurn(tokenOrder[1], function () {
            turnHit = true
        })
        subject.done(tokenOrder[0])

        turnHit.should.eq(true)

    })
})
