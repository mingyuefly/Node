const ejs = require('ejs')

let bgColor='red';
let divColor = `当前div背景颜色是${ bgColor }`;
console.log(divColor); //当前div背景颜色是red

let a=1;
let b=2;
let c=`${a+b}`
console.log(c)

const user = {
    // name:'haha'
    name:'<script />'
}

console.log(`${user.name}`)
const userName = `user的名字是${user.name}`
console.log(userName)

const result = `<h2>${user.name}</h2>`
console.log(result)

const vm = require('vm')
console.log(vm.runInNewContext('`<h2>${user.name}</h2>`', {user}))
//过滤script
console.log(vm.runInNewContext('`<h2>${_(user.name)}</h2>`', {
    user,
     _: function(markup) {
        if (!markup) return ''
        return String(markup)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
    }
}))




// const vm = require('vm')

//template 
const templateMap = {
    templateA: '`<h2>${include("templateB")}</h2>`',
    templateB: '`<p>hahahahahahahaha</p>`'
}

const context = {
    include: function(name) {
        return templateMap[name]()
    },
     _: function(markup) {
        if (!markup) return ''
        return String(markup)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
    }
}

Object.keys(templateMap).forEach(key=>{
    const temp = templateMap[key]
    templateMap[key] = vm.runInNewContext(
        `(function() {
            return ${temp}
        })`, context
    )
})

console.log(templateMap['templateA']())












// const template = `<h2><%= user.name %></h2>`
// console.log(template)

// console.log(ejs.render(template, user))





