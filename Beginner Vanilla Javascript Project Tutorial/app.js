// const person=
// [
//     {
//         id:1,
//         firstName:"aaa",
//         lastName:"adress"
//     },
//     {
//         id:2,
//         firstName:"2222",
//         lastName:"a22rsss2"
//     },
// ]
// const map=person.filter(item=>item.id===1)
// console.log(map);
class Person
{
    constructor(id,firstName,lastName)
    {
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
    }
    getFullName= ()=>{ return `${this.firstName} ${this.lastName}`}
}

 const person=new Person(1,"simo","ttalssi");
 console.log(person.getFullName());
