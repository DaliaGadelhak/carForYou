import React,{useState,useEffect} from 'react'
import Select from '../Select/Select.js'
import './MakeModelSelect.css'

function Selection() {
const [makes, setMakes] = useState([])
const [make, setMake] = useState ('')
const [models, setModels] = useState([])
const [model, setModel] = useState('')
const [types, setTypes] = useState ([])
const [type ,setType] = useState ('')
const [details, setDetails] = useState (null)


function parse(str) {
    if(str === str.toLowerCase()){
        return str
    }else{
       let word = ''
       return str.split('').reduce((acc,letter) => {
        
       if(letter == letter.toLowerCase()){
           word += letter
        }else{
           acc.push(word)
           word = letter.toLowerCase()
           
        }
       return acc
       } ,[] ).join(' ') + ' ' + word 
    }
   }

useEffect(() => {
    fetch(`https://catalogue-service.preprod.carforyou.ch:443/api/makes`)
    .then(json => json.json())
    .then(data => setMakes(data))
},[])

useEffect(() => {
    if(make){
        fetch(`https://catalogue-service.preprod.carforyou.ch:443/api/makes/key/${make}/models`)
        .then(json => json.json())
        .then(data => setModels(data))
    }else{
        setModels([])    
    } 
    setModel('')
    setType('')
    setDetails(null)               
},[make])

useEffect(() => {
    if(model){
        fetch(`https://catalogue-service.preprod.carforyou.ch:443/api/types?makeKey=${make}&modelKey=${model}`)
        .then(json => json.json())
        .then(data => {
            if(!data.empty){
                setTypes(data.content)
            }else{
                setTypes([])
            }
        })   
    }else{
        setTypes([])
    }
    setType('')
    setDetails(null)   
},[model])


useEffect(()=>{
    if(type){
        fetch(`https://catalogue-service.preprod.carforyou.ch:443/api/types/${type}`)
        .then(json => json.json())
        .then(data => setDetails(data))

    }else{
        setDetails(null)
    }     
},[type])

    return (
        <div>
            
            <div className='flex'>
                <Select
                    onChangeHandle={setMake} 
                    intialOptionValue="Choose Brand"
                    arrayToMap= {makes} 
                    optionValueProperty= "key"
                    optionPreviewProperty= "name"
                />

                <Select
                    onChangeHandle={setModel} 
                    intialOptionValue="Choose Model"
                    arrayToMap= {models} 
                    optionValueProperty= "key"
                    optionPreviewProperty= "name"
                />
            
                <Select
                    onChangeHandle={setType} 
                    intialOptionValue= "Choose Type"
                    arrayToMap= {types} 
                    optionValueProperty= "id"
                    optionPreviewProperty= "fullName"
                />

                   
           </div> 

           <div>
                <h3 style={{textAlign:'center'}}> 
                    Details for Car-Brand: <strong style={{color:'blue', marginRight:'10px'}}>{make}</strong> 
                    Model: <strong style={{color:'green',marginRight:'10px'}}>{model}</strong> 
                    Type: <strong style={{color:'red',marginRight:'10px'}}>
                        {
                                model 
                            ?
                                    types.length
                                ?
                                    type
                                :
                                    <h4>No types are available for this Model at this moment,
                                    <br/> Please, select another Model!
                                    </h4>
                            :
                                null
                        }
                        </strong>
                </h3>
            
                <hr style={{width:'150px'}}/>

                <div className='flex1'>
            
                    {
                            details
                        ?
                            Object.keys(details).map(detail => 
                                    details[detail]
                                ?
                                    <div key={detail} >
                                        <b>{parse(detail)}: </b>{details[detail]}
                                    </div> 
                                :
                                    null
                            )
                        :
                            null
                    }
                </div>
            </div>
            <button>Click here to check gitHub</button>
            <button style={{color:black}}>New Button!</button>
        </div>
    )
}

export default Selection
