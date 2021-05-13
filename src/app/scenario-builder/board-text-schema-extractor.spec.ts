/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()
import { arrayProperty, objectProperty, singularProperty } from "../../app/spec";
import { extractStepSchema } from "./board-text-schema-extractor";

describe('how the schema becomes extracted from text', function () {
    it('extracts the first line as title', async function () {
        const schema = await extractStepSchema({
            abstractionWidgetText: `title`,
            exampleWidgetText: `title`
        });
        (schema.title.should as singularProperty).eq('title')
    })
    it('extracts second line as property', async function name() {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
            first_name: Mohsen`
        });
        (schema.properties.first_name as objectProperty).example.should.eq('Mohsen')
    })
    it('removes the dash as the first char of property names', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                        -first_name: Mohsen
                        -   last_name:Bazmi`
        });

        (schema.properties.first_name as singularProperty).example.should.eq('Mohsen');
        (schema.properties["last_name"] as singularProperty).example.should.eq('Bazmi');
    })
    it('skips white spaces and empty lines', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `
            
                                person
            
            
            
            `,
            exampleWidgetText: `
            
            
                              person



                         first_name: Mohsen
             
                         
                         last_name:Bazmi


                        `
        });

        (schema.properties.first_name as singularProperty).example.should.eq('Mohsen');
        (schema.properties.last_name as singularProperty).example.should.eq('Bazmi')
    })
    it('copies property titles as property values when no property value is provided', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                              first_name
                              last_name`
        });

        (schema.properties.first_name as singularProperty).example.should.eq('first_name');
        (schema.properties.last_name as singularProperty).example.should.eq('last_name');

    })
    it('separates properties by ;', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                  first name: Mohsen;last name: Bazmi
            `
        });
        (schema.properties["first name"] as singularProperty).example.should.eq('Mohsen')
    })
    it('separates properties by ,', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                            first_name: Mohsen,last name: Bazmi`
        });
        (schema.properties.first_name as singularProperty).example.should.eq('Mohsen')
    })
    it('separates properties by /', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                            first_name: Mohsen/last name: Bazmi`
        });
        (schema.properties.first_name as singularProperty).example.should.eq('Mohsen')
    })
    it('rejects when the title is not in abstraction widget or example widget', async () => {
        extractStepSchema({
            abstractionWidgetText: ``,
            exampleWidgetText: `first name: Mohsen/last name: Bazmi`
        }).catch(err => err.should.not.be.null)
    })
    it('skips white spaces from abstraction title', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `                person                 `,
            exampleWidgetText: ``
        });
        schema.title.should.eq('person')
    })
    // it('it replaces spaces in property names with _', async () => {
    //     const schema = await extractStepSchema({
    //         abstractionWidgetText: `person`,
    //         exampleWidgetText: `person
    //                         first name is separated by space`
    //     })
    //     schema.properties.first_name_is_separated_by_space.should.not.undefined
    // })
    // it('it replaces - in property names with _', async () => {
    //     const schema = await extractStepSchema({
    //         abstractionWidgetText: `person`,
    //         exampleWidgetText: `person
    //                         first-name-is-separated-by-dash`
    //     })
    //     schema.properties.first_name_is_separated_by_dash.should.not.undefined
    // })
    // it('it replaces redundant _s in property names with  a single_', async () => {
    //     const schema = await extractStepSchema({
    //         abstractionWidgetText: `person`,
    //         exampleWidgetText: `person
    //                         first__name_____is__________separated___by_redundant_underlines`
    //     })
    //     schema.properties.first_name_is_separated_by_redundant_underlines.should.not.undefined
    // })
    xit('it splits camel case phrases in property names by _', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                               firstName`
        });
        (schema.properties.first_name as singularProperty).should.not.undefined
    })
    it('it does not change property names with words that are separated by _ already', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `person`,
            exampleWidgetText: `person
                            first_name_is_separated_by_underline`
        });
        (schema.properties.first_name_is_separated_by_underline as singularProperty).should.not.undefined
    })
    // it('it de-capitalizes title',async ()=>{
    //     const schema = await extractStepSchema({
    //         abstractionWidgetText: `De_Capitalize_Me`,
    //         exampleWidgetText: `De_Capitalize_Me
    //                         first_name_is_separated_by_underline`
    //     })
    //     schema.title.should.eq('de_capitalize_me')
    // })
    it('detects [items in brackets] as arrays', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `Add Items to Basket`,
            exampleWidgetText: `Add Items to Basket

            Customer Id
            
            Items:[product id,
            
            amount]`
        });
        (schema.properties.Items as arrayProperty).type.should.eq('array')
    })
    it('does not detect a property value that does not end with ] as an array', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `Add Items to Basket`,
            exampleWidgetText: `Add Items to Basket

            Customer Id
            
            Items:[product id,
            
            amount`
        });
        (schema.properties.Items as arrayProperty).type.should.not.eq('array')
    })
    it('detects the properties of the internal array', async () => {
        const schema = await extractStepSchema({
            abstractionWidgetText: `Add Items to Basket`,
            exampleWidgetText: `Add Items to Basket

            Customer Id
            
            array_sample:[product_id:val,
            
            amount],
            root_property`
        });
        console.log(">>>>>>>>>>>>>>>>>>", schema.properties);
        ((schema.properties.array_sample as arrayProperty).items[0] as objectProperty).type.should.be("object")
    })
})