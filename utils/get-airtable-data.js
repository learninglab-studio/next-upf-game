const airtableTools = require('./airtable-tools')

module.exports = async () => {
    const records = await airtableTools.findMany({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Situations"
    })
    return records
}