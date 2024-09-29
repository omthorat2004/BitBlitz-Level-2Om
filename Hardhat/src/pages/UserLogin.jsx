import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkWalletStatus, connectWallet } from '../features/wallet/walletSlice';

const UserLogin = () => {
    const dispatch = useDispatch()
    const {isConnected} = useSelector((state)=>state.wallet)
    const navigate = useNavigate()
    const handleClick = ()=>{
        console.log("Button clicked");
        dispatch(connectWallet())
    }
    useEffect(()=>{
        dispatch(checkWalletStatus())
    },[])
    useEffect(()=>{
        if(isConnected){
            navigate('/voter/home')
        }
    },[isConnected])

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex justify-center'>
            <button onClick={handleClick}>Connect Wallet</button>
        </div>
    </div>
  );
}

export default UserLogin;
