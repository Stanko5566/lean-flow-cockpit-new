
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StatusCard from "@/components/dashboard/StatusCard";
import KpiCard from "@/components/dashboard/KpiCard";
import ProgressCard from "@/components/dashboard/ProgressCard";
import LeanInitiativeCard from "@/components/dashboard/LeanInitiativeCard";
import { useLeanInitiatives } from "@/hooks/useLeanInitiatives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Der Titel muss mindestens 2 Zeichen haben"),
  description: z.string().min(5, "Die Beschreibung muss mindestens 5 Zeichen haben"),
  status: z.enum(["green", "yellow", "red"]),
  due_date: z.string().optional(),
  owner: z.string().min(2, "Bitte geben Sie einen Verantwortlichen an").optional(),
  progress: z.number().min(0).max(100).default(0),
});

type FormData = z.infer<typeof formSchema>;

const Dashboard = () => {
  const { initiatives, isLoading, createInitiative } = useLeanInitiatives();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "green",
      due_date: "",
      owner: "",
      progress: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    // Make sure the required fields are present before passing to createInitiative
    createInitiative({
      title: data.title,
      description: data.description,
      status: data.status,
      due_date: data.due_date || null,
      owner: data.owner || null,
      progress: data.progress || 0,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Neue Initiative
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue Lean-Initiative erstellen</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titel</FormLabel>
                      <FormControl>
                        <Input placeholder="Titel der Initiative" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Beschreibung der Initiative"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Status wählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="green">Auf Kurs</SelectItem>
                            <SelectItem value="yellow">Gefährdet</SelectItem>
                            <SelectItem value="red">Kritisch</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="progress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fortschritt (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fälligkeitsdatum</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verantwortlicher</FormLabel>
                        <FormControl>
                          <Input placeholder="Name des Verantwortlichen" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Erstellen</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="dashboard-grid">
        <KpiCard
          title="OEE (Gesamtanlageneffektivität)"
          value="78.2%"
          trend="up"
          trendValue="+2.4% vs. Vormonat"
        />
        <KpiCard
          title="Durchlaufzeit"
          value="4.2 Tage"
          trend="down"
          trendValue="-0.5 Tage vs. Ziel"
        />
        <KpiCard
          title="Ausschussquote"
          value="1.8%"
          trend="down"
          trendValue="-0.3% vs. Vormonat"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Lean-Initiativen Status</h2>
        <div className="dashboard-grid">
          <StatusCard
            title="5S Aktivitäten"
            value="7 von 10 Bereichen"
            status="green"
          />
          <StatusCard
            title="Kaizen-Vorschläge"
            value="12 ausstehend"
            status="yellow"
          />
          <StatusCard
            title="TPM-Maßnahmen"
            value="3 überfällig"
            status="red"
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Aktuelle Projekte</h2>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">Lade Initiativen...</div>
          </div>
        ) : initiatives.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground mb-4">Keine Lean-Initiativen gefunden</p>
            <Button onClick={() => setOpen(true)} variant="outline">
              Erste Initiative erstellen
            </Button>
          </div>
        ) : (
          <div className="dashboard-grid">
            {initiatives.slice(0, 3).map((initiative) => (
              <LeanInitiativeCard
                key={initiative.id}
                title={initiative.title}
                description={initiative.description}
                status={initiative.status}
                dueDate={initiative.due_date || undefined}
                owner={initiative.owner || undefined}
                progress={initiative.progress}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Fortschritt</h2>
        <div className="dashboard-grid">
          <ProgressCard
            title="Standardisierte Arbeitsplätze"
            value={18}
            max={25}
          />
          <ProgressCard
            title="Umgesetzte Kaizen-Vorschläge"
            value={42}
            max={50}
          />
          <ProgressCard
            title="5S Audit-Score"
            value={78}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
