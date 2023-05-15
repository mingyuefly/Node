var {graphql, buildSchema} = require('graphql')

// construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        hello: String
    }
`)

// The root provides a rosolver function for each API endpoint
var root = {
    hello: ()=>{
        return 'Hello world!'
    },
}

// run the GraphQL query '{hello}' and print out the response
module.exports = function(query) {
    return graphql({
        schema: schema, 
        source: query, 
        rootValue: root
    }).then((response) => {
        return response
    //   console.log(response);
    })
}


// run the GraphQL query '{hello}' and print out the response
// graphql(schema, '{ hello }', root).then((response)=>{
//     console.log(response) 
// })




// graphql({
//     schema: schema, 
//     source: '{ hello }', 
//     rootValue: root
// }).then((response) => {
//   console.log(response);
// })


