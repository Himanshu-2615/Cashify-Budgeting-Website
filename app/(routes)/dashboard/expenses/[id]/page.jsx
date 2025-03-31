"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ Import useParams
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenBoxIcon, Trash } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { toast } from "sonner";  
import EditBudget from "../_components/EditBudget";

function ExpensesScreen() {
  const { user } = useUser();
  const params = useParams(); 
  const budgetId = params?.id; 
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route=useRouter();

  useEffect(() => {
    user&&getBudgetInfo();
  }, [user]); 

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, budgetId)) 
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, budgetId)) 
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
    return result
  }

  const deleteBudget = async () => {
    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId, budgetId))
    .returning()
    if(deleteExpenseResult){
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id, budgetId))
        .returning();
    }

    toast("Budget Deleted!");
    route.replace('/dashboard/budgets');
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex gap-2 items-center">
        <ArrowLeft onClick={()=>route.back()} className="cursor-pointer" />
        My Expenses
        </span>

        <div className="flex gap-2 items-center">
            <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo}/>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="flex gap-2" variant="destructive">
                        <Trash /> Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your current budget along with all the expenses.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[145px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense budgetId={budgetId} user={user}
        refreshData={()=>getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
