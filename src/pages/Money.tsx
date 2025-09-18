import { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
}

const Money = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "income", category: "Rice Sales", amount: 25000, description: "Sold 100 kg rice", date: "2024-09-15" },
    { id: 2, type: "expense", category: "Seeds", amount: 3000, description: "Paddy seeds purchase", date: "2024-09-10" },
    { id: 3, type: "expense", category: "Fertilizer", amount: 5500, description: "NPK fertilizer", date: "2024-09-08" },
    { id: 4, type: "income", category: "Vegetable Sales", amount: 8000, description: "Sold vegetables", date: "2024-09-12" },
    { id: 5, type: "expense", category: "Irrigation", amount: 2000, description: "Water pump fuel", date: "2024-09-05" },
  ]);

  const [formData, setFormData] = useState({
    type: "expense" as "income" | "expense",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  const incomeCategories = ["Rice Sales", "Vegetable Sales", "Fruit Sales", "Dairy Products", "Government Subsidy", "Other Income"];
  const expenseCategories = ["Seeds", "Fertilizer", "Pesticide", "Irrigation", "Equipment", "Labor", "Transportation", "Other Expense"];

  const addTransaction = () => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: { pathname: '/money' } } });
      return;
    }
    
    if (!formData.category || !formData.amount || !formData.description) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: "expense",
      category: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteTransaction = (id: number) => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: { pathname: '/money' } } });
      return;
    }
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Money <span className="text-primary">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your farming income, expenses, and profitability with detailed analytics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 text-success mr-2" />
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">₹{totalIncome.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">From all sales and income sources</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingDown className="w-5 h-5 text-destructive mr-2" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">₹{totalExpenses.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">From all farming costs</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                Net Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                ₹{netProfit.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {netProfit >= 0 ? 'Profitable this period' : 'Loss this period'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Transaction Form */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Transaction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="type">Transaction Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "income" | "expense") => {
                    if (!isAuthenticated) {
                      navigate('/signin', { state: { from: { pathname: '/money' } } });
                      return;
                    }
                    setFormData({ ...formData, type: value, category: "" });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    if (!isAuthenticated) {
                      navigate('/signin', { state: { from: { pathname: '/money' } } });
                      return;
                    }
                    setFormData({ ...formData, category: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.type === "income" ? incomeCategories : expenseCategories).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => {
                    if (!isAuthenticated) {
                      navigate('/signin', { state: { from: { pathname: '/money' } } });
                      return;
                    }
                    setFormData({ ...formData, amount: e.target.value });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => {
                    if (!isAuthenticated) {
                      navigate('/signin', { state: { from: { pathname: '/money' } } });
                      return;
                    }
                    setFormData({ ...formData, description: e.target.value });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    if (!isAuthenticated) {
                      navigate('/signin', { state: { from: { pathname: '/money' } } });
                      return;
                    }
                    setFormData({ ...formData, date: e.target.value });
                  }}
                />
              </div>

              <Button onClick={addTransaction} className="w-full" variant="default">
                Add Transaction
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 10).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.category}</div>
                            <div className="text-sm text-muted-foreground">{transaction.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-semibold ${
                            transaction.type === "income" ? "text-success" : "text-destructive"
                          }`}>
                            {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Monthly Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Income Breakdown</h4>
                  <div className="space-y-3">
                    {incomeCategories.map((category) => {
                      const amount = transactions
                        .filter(t => t.type === "income" && t.category === category)
                        .reduce((sum, t) => sum + t.amount, 0);
                      const percentage = totalIncome > 0 ? (amount / totalIncome * 100) : 0;
                      
                      if (amount === 0) return null;
                      
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <div className="text-right">
                            <div className="font-semibold">₹{amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Expense Breakdown</h4>
                  <div className="space-y-3">
                    {expenseCategories.map((category) => {
                      const amount = transactions
                        .filter(t => t.type === "expense" && t.category === category)
                        .reduce((sum, t) => sum + t.amount, 0);
                      const percentage = totalExpenses > 0 ? (amount / totalExpenses * 100) : 0;
                      
                      if (amount === 0) return null;
                      
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <div className="text-right">
                            <div className="font-semibold">₹{amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Money;