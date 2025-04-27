import React from "react";
import { Clock, Trash2 } from "lucide-react";
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
import { useGembaWalks } from "@/hooks/useGembaWalks";
import { Button } from "@/components/ui/button";
import { CreateGembaDialog } from "@/components/gemba/CreateGembaDialog";
import { useTranslation } from "react-i18next";

const GembaPage = () => {
  const { walks, isLoading, deleteWalk } = useGembaWalks();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [walkToDelete, setWalkToDelete] = React.useState<{ id: string; title: string } | null>(null);

  const handleDeleteClick = (id: string, title: string) => {
    setWalkToDelete({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (walkToDelete) {
      deleteWalk(walkToDelete.id);
      setDeleteDialogOpen(false);
      setWalkToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Gemba Walks</h1>
        <CreateGembaDialog />
      </div>

      {isLoading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {walks.length > 0 ? (
            walks.map((walk) => (
              <Card key={walk.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{walk.title}</CardTitle>
                      <CardDescription>Bereich: {walk.area}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(walk.id, walk.title)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Beschreibung:</span>
                      <p className="mt-1 text-muted-foreground">{walk.description}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Beobachtungen:</span>
                      <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                        {walk.observations.map((observation, index) => (
                          <li key={index}>{observation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-muted-foreground">
              Keine Gemba Walks gefunden. Erstellen Sie einen neuen Walk mit dem Button oben rechts.
            </div>
          )}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.confirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('common.deleteConfirmation', { item: walkToDelete?.title })}
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

export default GembaPage;
