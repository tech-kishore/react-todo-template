const person={
    name:'Kishore Rakumar',
    address:{
        line1:'Bakers Street',
        city:'London',
        country: 'UK'
    },
    profiles:['twitter','linkedIn','Instagram'],
    printProfile:()=>{
        person.profiles.map((profile)=>{
            console.log(profile);
        })
    }
}


function LearningJavaScript(){
    return(
        <>
            <div>{person.name}</div>
            <div>{person.address.line1}, {person.address.city}, {person.address.country}</div>
            <div>{person.profiles[0]} | {person.profiles[1]} | {person.profiles[2]}</div>
            <div>{person.printProfile()}</div>
        </>
    );
}

export default LearningJavaScript;