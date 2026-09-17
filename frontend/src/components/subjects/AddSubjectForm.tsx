// frontend/src/components/subjects/AddSubjectForm.tsx
import { FormEvent, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import "./subjects.css";

type AddSubjectFormProps = {
  onSubmit: (subject: {
    name: string;
    code: string;
    color: string;
  }) => void;
  onCancel?: () => void;
};

export function AddSubjectForm({
  onSubmit,
  onCancel,
}: AddSubjectFormProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("#6366f1");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    onSubmit({
      name: trimmedName,
      code: code.trim(),
      color,
    });
  }

  return (
    <Card className="add-subject-card">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Build your workspace</span>
          <h2>Add subject</h2>
        </div>
      </div>

      <form className="add-subject-form" onSubmit={handleSubmit}>
        <Input
          label="Subject name"
          placeholder="e.g. Data Structures"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <Input
          label="Subject code"
          placeholder="e.g. CS201"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />

        <label className="subject-color-field">
          <span>Subject color</span>
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </label>

        <div className="add-subject-form__actions">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add subject</Button>
        </div>
      </form>
    </Card>
  );
}