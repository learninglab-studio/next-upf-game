const airtableTools = require('./airtable-tools')

export async function getAirtableData () {
    const records = await airtableTools.findMany({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Situations"
    })
    return records
}

export async function getAllSituationIds() {
    const situations = await airtableTools.findMany({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Situations"
    })
    return situations.map((situation) => {
      return {
        params: {
          id: situation.id,
        //   name: situation.fields.Title
        },
      };
    });
}

export async function getSituationData(id) {
    const record = await airtableTools.findRecordById({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Situations",
        recordId: id
    })
    console.log(JSON.stringify(record, null, 4))
    return {
        id,
        fields: record.fields
    }
}