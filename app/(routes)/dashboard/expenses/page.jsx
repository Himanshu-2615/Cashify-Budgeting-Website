"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "../expenses/_components/ExpenseListTable"; 
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function AllExpensesScreen() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  const getAllExpenses = async () => {
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id)); 

    setExpensesList(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          All Expenses
        </span>
      </h2>
      <div className="mt-6">
        <ExpenseListTable expensesList={expensesList} refreshData={getAllExpenses} />
      </div>
    </div>
  );
}

export default AllExpensesScreen;
