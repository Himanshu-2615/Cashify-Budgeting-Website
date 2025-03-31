import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function ExpenseListTable({expensesList, refreshData}) {

    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning();
        if (result) {
            refreshData()
            toast('Expense Deleted!')
        }
    }

  return (
    <div className='mt-3'>
        <h2 className="font-bold text-lg mt-3 mb-2">Latest Expenses</h2>
        <div className='grid grid-cols-4 bg-[#e3d6ff] p-2'>
            <h2 className='font-semibold'>Name</h2>
            <h2 className='font-semibold'>Amount</h2>
            <h2 className='font-semibold'>Date</h2>
            <h2 className='font-semibold'>Action</h2>
        </div>
        {expensesList.map((expenses, index) => (
            <div className='grid grid-cols-4 bg-purple-50 p-2'>
                <h2>{expenses.name}</h2>
                <h2>{expenses.amount}</h2>
                <h2>{expenses.createdAt}</h2>
                <h2>
                    <Trash className='text-red-600 cursor-pointer'
                    onClick={() => deleteExpense(expenses)}
                    />
                </h2>
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable