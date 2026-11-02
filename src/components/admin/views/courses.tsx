"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { formatCOP } from "@/lib/site";
import { clientName, formatLongDay, useData, type Course } from "../store";
import { ActionButton, Avatar, Card, PageTitle, Stat, useToast } from "../ui";

export function CoursesView() {
  const { data } = useData();
  const { toast, show } = useToast();
  const enrolled = data.courses.reduce((sum, course) => sum + course.enrolled.length, 0);
  const seats = data.courses.reduce((sum, course) => sum + course.seats, 0);
  const income = data.courses.reduce((sum, course) => sum + course.enrolled.length * course.price, 0);

  return (
    <>
      <PageTitle
        eyebrow="Cursos"
        title={
          <>
            Tus <em className="text-nude-deep">alumnas</em>
          </>
        }
        intro="Fechas, cupos e inscritas de cada curso. Cuando se llena, la web lo muestra como “Agotado”."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Inscritas" value={enrolled} note={`De ${seats} cupos en total`} />
        <Stat label="Cupos libres" value={seats - enrolled} />
        <Stat label="Ingresos por cursos" value={formatCOP(income)} note="Inscripciones actuales" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {data.courses.map((course) => (
          <CourseCard key={course.id} course={course} onToast={show} />
        ))}
      </div>
      {toast}
    </>
  );
}

function CourseCard({ course, onToast }: { course: Course; onToast: (message: string) => void }) {
  const { data, mutate } = useData();
  const [student, setStudent] = useState<string | null>(null);
  const full = course.enrolled.length >= course.seats;
  const percent = Math.round((course.enrolled.length / course.seats) * 100);
  const available = data.clients.filter((client) => !course.enrolled.includes(client.id));

  return (
    <Card className="flex flex-col">
      <p className="eyebrow text-nude-deep">{formatLongDay(course.date)}</p>
      <h2 className="mt-2 font-display text-[1.35rem] leading-tight text-ink">{course.name}</h2>
      <p className="mt-1 text-[0.88rem] text-ink-soft">{formatCOP(course.price)} por alumna</p>
      <div className="mt-5">
        <div className="flex justify-between text-[0.82rem]">
          <span className="text-ink">
            {course.enrolled.length} de {course.seats} cupos
          </span>
          <span className={full ? "text-nude-deep" : "text-ink-soft"}>{full ? "Agotado" : `${course.seats - course.enrolled.length} libres`}</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-marble">
          <div className="h-full rounded-full bg-nude-deep transition-[width] duration-300" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <ul className="mt-5 flex-1 space-y-2">
        {course.enrolled.map((id) => (
          <li key={id} className="flex items-center gap-2.5 text-[0.88rem] text-ink">
            <Avatar name={clientName(data, id)} />
            {clientName(data, id)}
          </li>
        ))}
        {!course.enrolled.length ? <li className="text-[0.85rem] text-ink-soft">Aún no hay inscritas.</li> : null}
      </ul>
      {!full ? (
        <div className="mt-5 space-y-2 border-t border-line pt-4">
          <Select label="Inscribir alumna" placeholder="Elige una clienta" value={student} onChange={setStudent} options={available.map((client) => ({ value: client.id, label: client.name }))} />
          <ActionButton
            variant="outline"
            className="w-full"
            disabled={!student}
            loadingText="Inscribiendo"
            onClick={async () => {
              if (!student) return;
              await mutate((current) => ({ ...current, courses: current.courses.map((item) => (item.id === course.id ? { ...item, enrolled: [...item.enrolled, student] } : item)) }));
              onToast(`${clientName(data, student)} inscrita`);
              setStudent(null);
            }}
          >
            Inscribir
          </ActionButton>
        </div>
      ) : null}
    </Card>
  );
}
