import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios'


const getResult = async () => {
    const {result} = axios.get(
        'http://192.168.0.166:50011/save'
    )
    return result
}