const aws = {
    region: "us-west-2"
}

const gifts = {
    tableName: "user_gifts",
    hashKey: "email",
    rangeKey : "gift_id"
}

module.exports = {
    aws,
    gifts
}