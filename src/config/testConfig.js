const aws = {
    region: "us-east-1"
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