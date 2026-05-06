import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersonalInfoSection({ data, onChange }) {
  const update = (field) => (e) =>
    onChange({ ...data, [field]: e.target.value });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          Personal info
        </h2>
        <p className="text-sm text-muted-foreground">
          The basics. This appears at the top of your CV.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={data?.fullName || ""}
            onChange={update("fullName")}
            placeholder="Full Name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data?.email || ""}
            onChange={update("email")}
            placeholder="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={data?.phone || ""}
            onChange={update("phone")}
            placeholder="+1 555 000 0000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data?.location || ""}
            onChange={update("location")}
            placeholder="City, Country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data?.linkedin || ""}
            onChange={update("linkedin")}
            placeholder="linkedin.com/in/yourname"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="portfolio">Portfolio / website</Label>
          <Input
            id="portfolio"
            value={data?.portfolio || ""}
            onChange={update("portfolio")}
            placeholder="yourname.com"
          />
        </div>
      </div>
    </motion.div>
  );
}
