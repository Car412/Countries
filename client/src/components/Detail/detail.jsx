import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import{estilos} from './detail.module.css';

export default function Detail(){
    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getDetail(id))
    }, [dispatch]) // eslint-disable-line

    const detCountry = useSelector((state)=>state.detail)

   
    
}
