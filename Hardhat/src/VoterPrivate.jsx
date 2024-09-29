import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { checkWalletStatus } from './features/wallet/walletSlice';

const VoterPrivate = () => {
    const dispatch = useDispatch()
    const {account,loading} = useSelector((state)=>state.wallet)
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(checkWalletStatus())
    },[])
    useEffect(()=>{
        if(!loading&& !account){
            navigate('/register')
        }
    },[loading])

    if(loading){
        return <h1>Loading...</h1>
    }

   
  return (
    <div>
        <Outlet/>
    </div>
  );
}

export default VoterPrivate;
