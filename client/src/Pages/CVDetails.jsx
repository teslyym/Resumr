import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";

export default function CVDetails() {
  const { id } = useParams();
  return (
    <Layout>
      <PageTransition>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-sm text-muted-foreground mb-2">CV ID: {id}</p>
          <h1 className="text-2xl font-semibold mb-3">CV view coming soon</h1>
          <p className="text-muted-foreground mb-6">
            ..........................
          </p>
          <Button asChild>
            <Link to="/dashboard">← Back to dashboard</Link>
          </Button>
        </div>
      </PageTransition>
    </Layout>
  );
}
