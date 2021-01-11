
const philip = {
    firstName: 'Philip',
    lastName: 'Windsor',
    parents: [],
    childOf: function() { return this.parents.map(parent => parent.firstName).join(' & ') || "Parents Unknown." },
}

const elizabeth = {
    firstName: 'Elizabeth',
    lastName: 'Windsor',
    parents: [],
    childOf: function() { return this.parents.map(parent => parent.firstName).join(' & ') || "Parents Unknown." },
}

const diana = {
    firstName: 'Diana',
    lastName: 'Spencer',
    parents: [],
    childOf: function() { return this.parents.map(parent => parent.firstName).join(' & ') || "Parents Unknown." },
}

const charles = {
    firstName: 'Charles',
    lastName: 'Windsor',
    parents: [philip,elizabeth],
    childOf: function() {  return this.parents.map(parent => parent.firstName).join(' & ') || "Parents Unknown." },
}

const william = {
    firstName: 'William',
    lastName: 'Windsor',
    parents: [diana, charles],
    childOf: function() {  return this.parents.map(parent => parent.firstName).join(' & ') || "Parents Unknown." },
}

console.log(william.childOf());
console.log("Charles's Parents: " + charles.childOf());
console.log("Diana's Parents: " + diana.childOf());
console.log("Elizabeth's Parents: " + elizabeth.childOf());
console.log("Philip's Parents: " + philip.childOf());

module.exports={william,diana,charles,philip,elizabeth}
