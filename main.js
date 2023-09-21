let myform = document.querySelector("form")
let myTabla = document.querySelector("#myData");
let elementos = document.getElementsByClassName("updateEvent")


addEventListener("DOMContentLoaded", async()=>{ 
    let res = await ( await fetch("https://650b130adfd73d1fab0987b2.mockapi.io/tabla")).json();
    res.forEach(element => {
        
        myTabla.insertAdjacentHTML("beforeend",`
            <tr class ="updateEvent" >

                <td> ${element.id} </td>
                <td>  ${element.valor} </td>
                <td> ${element.caja} </td>


            </tr>
        
        
        `)        
    }); 

    



});

myform.addEventListener("submit",async(e)=>{
    e.preventDefault();
    
    data = Object.fromEntries( new FormData(e.target))
    
    const { valor }   = data;
    data.valor = (typeof valor ==="string" ) ? Number(valor) : null;
    let config = {

        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    }
    
    let res = await (await fetch("https://650b130adfd73d1fab0987b2.mockapi.io/tabla",config)).json();
    console.log(JSON.stringify(data))
    console.log(res);
        
})

console.log(elementos.length)

elementos.forEach( (x)  =>  x.elemento.addEventListener("click",  async(j) => {
        
        data = Object.fromEntries( new FormData(j.target))
    
        console.log(data);

        let idElemento;

        
        let config = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        };
        res = await (await fetch(`https://650b130adfd73d1fab0987b2.mockapi.io/tabla/${idElemento}`,config)).json();
        
    }
))



