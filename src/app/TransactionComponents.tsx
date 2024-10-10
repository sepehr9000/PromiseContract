import { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { 
  Transaction, 
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction'; 
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { contracts } from './contracts'; 
import { baseSepolia } from 'wagmi/chains';
 
export default function TransactionComponents() {
  const { address } = useAccount();
  
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
  }, []);
 
  return address ? (
    <Transaction 
    capabilities={{ 
        paymasterService: { 
          url: process.env.PAYMASTER_AND_BUNDLER_ENDPOINT ?? '', 
        }, 
      }}
      chainId={baseSepolia.id}
      contracts={contracts}
      onStatus={handleOnStatus}
    >
      <TransactionButton />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>  
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className='h-6 w-6' />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
};