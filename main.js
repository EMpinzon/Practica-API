let myform = document.querySelector("form")
let myTabla = document.querySelector("#myData");
let elementos;



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

        let modificar = null;
        elementos =  document.querySelectorAll(".updateEvent  :nth-child(2), .updateEvent   :nth-child(3)");
        
        
        elementos.forEach( (x)  =>  x.addEventListener("click",  async(j) => {

            if(!modificar){
                let valoraCambiar = (j.target)
                let nuevoContenido;

                modificar = document.createElement("div");
                let plantilla ='<input type="text" class="inputValorNuevo" placeholder="Ingrese un nuevo valor">'
                modificar.innerHTML = plantilla;
                
                
                
                valoraCambiar.parentNode.parentNode.insertBefore(modificar,valoraCambiar.parentNode.nextSibling)
                
                let fila = valoraCambiar.parentNode;

                
                

                modificar.firstElementChild.addEventListener("keydown",async (e)=>{
                    nuevoContenido = e.target;
                    
                    
                    if (e.key === 'Enter')  {valoraCambiar.textContent = nuevoContenido.value;  nuevoContenido.parentNode.remove(); modificar=null; 
                        let config = {
                            method: 'PUT',
                            headers: {
                            'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "valor": Number(fila.children[1].textContent) ,
                                "caja": (fila.children[2].textContent ),
                                "id": fila.children[0].textContent
                            })
                        };
                        let id = (fila.children[0].textContent)
                        console.log(id)
                        let res2 = await (await fetch(`https://650b130adfd73d1fab0987b2.mockapi.io/tabla/${id}`,config)).json();
                        console.log(res2)
                    
                    }
                    
                       
                })


                


                
            }
            
                
        }
    ))
        

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








