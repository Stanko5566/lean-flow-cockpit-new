import React from "react";
import { Calendar, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTpmEquipment } from "@/hooks/useTpmEquipment";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateTpmDialog } from "@/components/tpm/CreateTpmDialog";
import { useTranslation } from "react-i18next";

const TpmPage = () => {
  const { equipment, isLoading, deleteEquipment } = useTpmEquipment();
  const { t } = useTranslation();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(t('common.confirmDelete', { item: name }))) {
      deleteEquipment(id);
    }
  };

  // Calculate days since last maintenance
  const getDaysSince = (dateString: string) => {
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Determine color for OEE score
  const getOeeColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  // Determine color and text for maintenance status
  const getMaintenanceStatus = (lastMaintenance: string) => {
    const days = getDaysSince(lastMaintenance);
    if (days > 30) return { text: t('tpm.daysAgo', { days }), color: "text-red-600" };
    return { text: t('tpm.daysAgo', { days }), color: "text-muted-foreground" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t('tpm.title')}</h1>
        <CreateTpmDialog />
      </div>

      {isLoading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {equipment.length > 0 ? (
            equipment.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>
                        {t('tpm.nextMaintenance')}: {formatDate(item.next_maintenance)}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id, item.name)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('tpm.oeeScore')}</span>
                      <span className={`text-sm ${getOeeColor(item.oee_score)}`}>
                        {item.oee_score}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('tpm.availability')}</span>
                      <span className="text-sm text-blue-600">{item.availability}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t('tpm.lastMaintenance')}</span>
                      <span className={`text-sm ${getMaintenanceStatus(item.last_maintenance).color}`}>
                        {getMaintenanceStatus(item.last_maintenance).text}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-6 text-muted-foreground">
              {t('tpm.noEquipment')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TpmPage;
