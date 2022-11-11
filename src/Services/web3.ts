import Web3 from 'web3'
import { ROPSTEN_RPC } from '@/Utils/constants';

const web3 = new Web3(ROPSTEN_RPC);

export const getBalance = (address: string) => {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(address).then((balance) => {
            resolve(web3.utils.fromWei(balance, 'ether'));
        }).catch((error) => {
            reject(error);
        });
    });
};

export default web3;


