import { useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStandardProcedures } from "@/hooks/useStandardProcedures";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateStandardDialog } from "@/components/standard-work/CreateStandardDialog";
import { useTranslation } from "react-i18next";

const StandardWork = () => {
  const { procedures, isLoading, deleteProcedure } = useStandardProcedures();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [procedureToDelete, setprocedureToDelete] = useState<{ id: string; title: string } | null>(null);

  const handleDeleteClick = (id: string, title: string) => {
    setprocedureToDelete({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (procedureToDelete) {
      deleteProcedure(procedureToDelete.id);
      setDeleteDialogOpen(false);
      setprocedureToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Standard Work</h1>
        <CreateStandardDialog />
      </div>

      {isLoading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {procedures.length > 0 ? (
            procedures.map((procedure) => (
              <Card key={procedure.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{procedure.title}</CardTitle>
                      <CardDescription>
                        Version {procedure.version} - Aktualisiert am {formatDate(procedure.updated_at)}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(procedure.id, procedure.title)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{procedure.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`bg-${procedure.status === 'Freigegeben' ? 'green' : 'yellow'}-100 text-${procedure.status === 'Freigegeben' ? 'green' : 'yellow'}-700 px-2 py-1 rounded`}>
                        {procedure.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-6 text-muted-foreground">
              Keine Standard Work Einträge gefunden. Erstellen Sie einen neuen Standard mit dem Button oben rechts.
            </div>
          )}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.confirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('common.deleteConfirmation', { item: procedureToDelete?.title })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StandardWork;
