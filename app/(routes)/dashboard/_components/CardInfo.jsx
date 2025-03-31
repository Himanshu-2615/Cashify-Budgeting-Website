import { index } from 'drizzle-orm/gel-core';
import { PiggyBankIcon, ReceiptTextIcon, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({ budgetList }) {

    const [totalBudget, setTotalBudget]=useState(0);
    const [totalSpend, setTotalSpend]=useState(0);

    useEffect(() => {
        budgetList&&CalculateCardInfo();
    },[budgetList])

    const CalculateCardInfo=()=>{
        let totalBudget_=0;
        let totalSpent_=0;
        budgetList.forEach(elemeny => {
            totalBudget_+=Number(elemeny.amount);
            totalSpent_+=elemeny.totalSpend;
        });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpent_);
    }

  return (
    <div>
    {budgetList?.length>0? 
        <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Total Budget</h2>
                        <h2 className='font-bold text-2xl'>{totalBudget}</h2>
                    </div>
                    <PiggyBankIcon className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Total Spent</h2>
                        <h2 className='font-bold text-2xl'>{totalSpend}</h2>
                    </div>
                    <ReceiptTextIcon className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No. of Budgets</h2>
                    <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                </div>
                <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>

        </div>
    :
        <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {[1,2,3].map((item, index) => (
                <div className='h-[115px] w-ful bg-slate-200 animate-pulse rounded-lg'>

                </div>
            ))}  
        </div>
    }
    </div>
  )
}

export default CardInfo