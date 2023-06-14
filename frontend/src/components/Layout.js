import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Matrix } from '../Redux/action';
import {Heading} from "@chakra-ui/react";
import "./Layout.css";

const Layout = () => {
    const [array,setArray]=useState([]);
    // This array is used to loop through and render elements on the UI;
    const [diff,setDiff]=useState([]);
    // This diff array is used to select the latest booked seats over previously booked seats by storing initial booked value and updated booked value;
    const dispatch=useDispatch();
    const {matrix,booked,isLoading,isError}=useSelector(store=>store);
    // To take matrix , booked value,& isLoading state are destructured using useSelector hook from global state of redux ;
    
    // 2 useEffects are used 1st one is used when when matrix.length>0 ; which is used set the actual values to 'arr' state from backend; This only happens after 2nd useEffect call GET API Call and stores those matrix values in globalState;  

    useEffect(()=>{
        let arr=[];
        if(matrix.length>0){
            for (let i=0;i<matrix.length;i++){
                for (let j=0;j<matrix[i].length;j++){
                    arr.push(matrix[i][j]);
                }
            }
        }
        setArray(arr);
       if(booked){
        setDiff([...diff,Number(booked)])
       }
        
    },[matrix,booked])

    // For Initial Rendering with allzero values in the array. This calls GET API and stores that matrix values from backend into redux-store to access.  
    useEffect(()=>{
        let arr=new Array(80).fill(0);
        setArray(arr)
        dispatch(Get_Matrix);
    },[dispatch]);

    // If isLoading is true it renders ...loading.. 
    if(isLoading){
        return <Heading>....Loading...</Heading>
    }
    // To handle Error;
    if(isError){
        return <Heading>...Error..</Heading>
    }
    
  return (
    <div className='container'>
            {/*Looping throught the array*/}
             {/* Ternary operator is used to render the div with different colors (red,green,blue) based on condition of booked seats and available seats */}
            {array.length>0 && array.map((item,ind)=>{
                return (
                    (ind+1>diff[0] && ind+1<=diff[diff.length-1]?<div key={ind} className={"blue1"}>{ind+1}</div>:((ind+1-3)%7===0?<div key={ind}  className={item===0?"gap":"gap1"}>{ind+1}</div>:<div key={ind} className={item===0?'child':'child1'}>{ind+1}</div> ))     
                )
            })}
    </div>
  )
}

export default Layout