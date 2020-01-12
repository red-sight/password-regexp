const regExp = require('../index.js').regExp
const expect = require('chai').expect;

describe('regExp', function () {

    it('Should be a regExp', function () {
        expect(regExp() instanceof RegExp).to.be.true
    })

    it('Should return a default expression: \n\
    \t- from 8 to 32 signs,\n\
    \t- at least 1 uppercase letter, \n\
    \t- 1 lowercase letter and 1 number', function () {
        let passwords = [
            'gg',
            '11',
            '222222222',
            'fgjhgjkkjhg87698',
            'GHHGHGFDJDDJHGFJHG6',
            'FGgh677',
            'FGgh677uiytrewsdfghjklmnbvcxzsdff',
            '!@#$%^&t',
            'ПрыведП%56'
        ]
        for (let i = 0; i <= passwords.length; i++) {
            expect(regExp().test(passwords[i])).to.be.false
        }
    })

    it('Max and min password length should depend on function arguments', function () {

        let testMinMax = (min, max, passwords, check) => {
            for (let i = 0; i < passwords.length; i++) {
                expect(regExp({
                    min,
                    max
                }).test(passwords[i])).to.equal(check)
            }
        }

        //Testing right passwords to be true
        let rightPasswords = [
            'Fb6',
            '6ghGh'
        ]
        testMinMax(3, 5, rightPasswords, true)

        //Now testing wrong passwords to be false
        let wrongPasswords = [
            'Fb',
            '6ghGhc44'
        ]
        testMinMax(3, 5, wrongPasswords, false)

    })

    it('Test possibility to disable numeric settings', function () {

        let passwords = [
            'FghhjhhgG',
            '012345Gy',
            'GhTyghghgGHG'
        ]

        for (let i = 0; i < passwords.length; i++) {
            expect(regExp({
                numeric: false
            }).test(passwords[i])).to.be.true
        }

    })

    it('Test possibility to disable uppercase settings', function () {

        let passwords = [
            'ghhghg67',
            'gygh5GHG',
            'GFEC5Hhh'
        ]

        for (let i = 0; i < passwords.length; i++) {
            expect(regExp({
                uppercase: false
            }).test(passwords[i])).to.be.true
        }

    })

    it('Test adding special symbols: ! @ # $ % ^ &', function () {

        let testSymbols = function (passwords, symbols, check) {
            for (let i = 0; i < passwords.length; i++) {
                expect(regExp({
                    symbols
                }).test(passwords[i])).to.equal(check)
            }
        }

        let rightPasswords = [
            'f%45Hghk',
            'f%45Hghk56DDD',
            'f@#45Hghk',
            'f%#!$%^&45Hghk',
            '$#2%^fgFFFG'
        ]

        testSymbols(rightPasswords, true, true)

        let wrongPasswords = [
            'ghTY56fff',
            'HyujgFGfg6712129'
        ]

        testSymbols(wrongPasswords, true, false)

        //Symbols are not restricted by default

        testSymbols(rightPasswords, false, true)

    })

})