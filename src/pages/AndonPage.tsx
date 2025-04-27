import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAndonStations, CreateAndonStationDto, StationStatus } from "@/hooks/useAndonStations";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string().min(2, "Der Name muss mindestens 2 Zeichen haben"),
  status: z.enum(["active", "maintenance", "error"]),
  efficiency: z.number().min(0, "Die Effizienz muss mindestens 0% sein").max(100, "Die Effizienz kann maximal 100% sein"),
  last_updated: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AndonPage = () => {
  const { stations, isLoading, createStation, updateStation, deleteStation } = useAndonStations();
  const [open, setOpen] = useState(false);
  const [liveView, setLiveView] = useState(false);
  const { t } = useTranslation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "active",
      efficiency: 100,
      last_updated: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: FormData) => {
    const stationData: CreateAndonStationDto = {
      name: data.name,
      status: data.status as StationStatus,
      efficiency: data.efficiency,
      last_updated: data.last_updated,
    };
    
    createStation(stationData);
    form.reset();
    setOpen(false);
  };

  // Helper functions for UI
  const getStatusColorClass = (status: StationStatus) => {
    switch (status) {
      case 'active': return 'border-green-500';
      case 'maintenance': return 'border-yellow-500';
      case 'error': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  const getStatusText = (status: StationStatus) => {
    switch (status) {
      case 'active': return { text: t('andon.status.active'), color: 'text-green-500' };
      case 'maintenance': return { text: t('andon.status.maintenance'), color: 'text-yellow-500' };
      case 'error': return { text: t('andon.status.error'), color: 'text-red-500' };
      default: return { text: t('andon.status.unknown'), color: 'text-gray-500' };
    }
  };

  const handleStatusChange = (stationId: string, newStatus: StationStatus) => {
    updateStation({ id: stationId, updates: { status: newStatus } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t('andon.title')}</h1>
        <div className="flex gap-2">
          <Button 
            variant={liveView ? "default" : "outline"} 
            className="flex items-center gap-1"
            onClick={() => setLiveView(!liveView)}
          >
            <Clock className="h-4 w-4" /> {t('andon.liveView')}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> {t('andon.newStation')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('andon.createStation')}</DialogTitle>
                <DialogDescription>
                  {t('andon.createStationDescription')}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('andon.stationNamePlaceholder')} {...field} />
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
                        <FormLabel>{t('common.status')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('andon.selectStatus')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">{t('andon.status.active')}</SelectItem>
                            <SelectItem value="maintenance">{t('andon.status.maintenance')}</SelectItem>
                            <SelectItem value="error">{t('andon.status.error')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="efficiency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('andon.efficiency')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="100" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">{t('common.create')}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">{t('common.loading')}</div>
        </div>
      ) : stations.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">Keine Andon-Stationen gefunden</p>
          <Button onClick={() => setOpen(true)} variant="outline">
            Erste Andon-Station erstellen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => {
            const statusInfo = getStatusText(station.status);
            return (
              <Card key={station.id} className={`${getStatusColorClass(station.status)} border-2`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center justify-between">
                      {station.name}
                      <span className={statusInfo.color + " text-sm"}>{statusInfo.text}</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteStation(station.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{station.efficiency}%</div>
                    <div className="text-sm text-muted-foreground">Effizienz heute</div>
                  </div>
                  {!liveView && (
                    <Select
                      value={station.status}
                      onValueChange={(value) => handleStatusChange(station.id, value as StationStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktiv</SelectItem>
                        <SelectItem value="maintenance">Wartung</SelectItem>
                        <SelectItem value="error">Störung</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AndonPage;
