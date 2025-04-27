import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTpmEquipment, CreateTpmEquipmentDto } from "@/hooks/useTpmEquipment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  status: z.string().min(1, "Status ist erforderlich"),
  oee_score: z.coerce.number().min(0).max(100, "OEE Score muss zwischen 0 und 100 liegen"),
  availability: z.coerce.number().min(0).max(100, "Verfügbarkeit muss zwischen 0 und 100 liegen"),
  last_maintenance: z.string().min(1, "Letzte Wartung ist erforderlich"),
  next_maintenance: z.string().min(1, "Nächste Wartung ist erforderlich"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTpmDialog() {
  const { createEquipment } = useTpmEquipment();
  const [open, setOpen] = React.useState(false);

  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthDate = nextMonth.toISOString().split('T')[0];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "Aktiv",
      oee_score: 85,
      availability: 90,
      last_maintenance: today,
      next_maintenance: nextMonthDate,
    },
  });

  function onSubmit(values: FormValues) {
    const newEquipment: CreateTpmEquipmentDto = {
      name: values.name,
      status: values.status,
      oee_score: values.oee_score,
      availability: values.availability,
      last_maintenance: values.last_maintenance,
      next_maintenance: values.next_maintenance,
    };
    
    createEquipment(newEquipment);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neues Gerät
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Neues Gerät hinzufügen</DialogTitle>
          <DialogDescription>
            Füllen Sie die Felder aus, um ein neues Gerät für die TPM-Wartung hinzuzufügen.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gerätename</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. CNC Fräse #2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        <SelectValue placeholder="Status auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Aktiv">Aktiv</SelectItem>
                      <SelectItem value="Wartung">In Wartung</SelectItem>
                      <SelectItem value="Defekt">Defekt</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="oee_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OEE Score (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verfügbarkeit (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="last_maintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Letzte Wartung</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="next_maintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nächste Wartung</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Erstellen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 