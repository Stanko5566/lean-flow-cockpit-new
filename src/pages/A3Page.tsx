import React from "react";
import { FileChartColumn, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useA3Reports } from "@/hooks/useA3Reports";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateA3Dialog } from "@/components/a3/CreateA3Dialog";
import { useTranslation } from "react-i18next";

const A3Page = () => {
  const { reports, isLoading, deleteReport } = useA3Reports();
  const { t } = useTranslation();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(t('common.confirmDelete', { item: title }))) {
      deleteReport(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t('a3.title')}</h1>
        <CreateA3Dialog />
      </div>

      {isLoading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reports.length > 0 ? (
            reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>{t('a3.createdOn')} {formatDate(report.created_at)}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <FileChartColumn className="h-4 w-4 text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(report.id, report.title)}
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
                      <span className="font-medium">{t('a3.status')}: {report.status}</span>
                      <div className="mt-2 space-y-1 text-muted-foreground">
                        <p>{t('a3.goal')}: {report.goal}</p>
                        <p>{t('a3.team')}: {report.team.join(', ')}</p>
                        {report.deadline && <p>{t('a3.deadline')}: {formatDate(report.deadline)}</p>}
                        {report.result && <p>{t('a3.result')}: {report.result}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-muted-foreground">
              {t('a3.noReports')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default A3Page;
