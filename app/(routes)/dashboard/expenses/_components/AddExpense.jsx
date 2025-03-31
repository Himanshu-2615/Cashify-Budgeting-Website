
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { eq, sql } from 'drizzle-orm';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const addNewExpense = async () => {
        const budget = await db.select({
            totalBudget: Budgets.amount,
            totalSpent: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.id, budgetId))
        .groupBy(Budgets.id)
        .then(res => res[0]);

        const remainingBudget = budget.totalBudget - budget.totalSpent;
        if (Number(amount) > remainingBudget) {
            toast.error('Expense exceeds the remaining budget!');
            setAmount('');
            return;
        }

        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY'),
        }).returning({ insertedId: Budgets.id });

        setAmount('');
        setName('');

        if (result) {
            refreshData()
            toast('New Expense Created!')
        }
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input placeholder='e.g. Bedroom Decor'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input placeholder='e.g. 500'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button disabled={!(name && amount)}
                onClick={() => addNewExpense()}
                className='mt-4 w-full'>Add New Expense</Button>
        </div>
    )
}

export default AddExpense