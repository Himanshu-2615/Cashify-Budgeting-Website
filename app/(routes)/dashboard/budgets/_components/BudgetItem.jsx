import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {

    const calculatePercentage=()=>{
        const perc= (budget.totalSpend/budget.amount)*100;
        return perc.toFixed(2);
    }

  return (
    <Link href={'/dashboard/expenses/'+budget?.id}>
        <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[160px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
                    <div>
                        <h2 className='font-bold'>{budget.name}</h2>
                        <h2 className='text-sm text-gray-500'>{budget.totalItems} Item</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'> ${budget.amount}</h2>
            </div>

            <div className='mt-5'>
                <div className='flex items-center justify-between mb-2'>
                    <h2 className='text-xs text-slate-400'>${budget.totalSpend?budget.totalSpend:0} Spent</h2>
                    <h2 className='text-xs text-slate-400'>${budget.amount-budget.totalSpend} Remaining</h2>
                </div>
                <div className='w-full bg-[#e3d6ff] h-2 rounded-full'>
                    <div className='bg-primary h-2 rounded-full'
                    style={{
                        width:`${calculatePercentage()}%`}}
                    ></div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default BudgetItem