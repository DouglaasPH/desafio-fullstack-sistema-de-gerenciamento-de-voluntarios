import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

function NewVolunteer() {
  return (
    <main className="w-full flex flex-col p-10 gap-8">
      <section className="">
        <button className="flex flex-row gap-5 text-sm items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-xl cursor-pointer">
          <ArrowLeft strokeWidth={3} size={20} />
          <span>Voltar para lista</span>
        </button>
      </section>
      <section>
        <Card className="p-10 flex flex-col justify-between">
          <div className="flex flex-col gap-3 w-55 lg:w-auto">
            <h1 className="font-bold text-2xl lg:text-3xl">Novo Voluntário</h1>
            <p className="text-sm text-gray-500">
              Preencha os dados para cadastrar um novo voluntário
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
            <div className="w-full">
              <label className="text-sm text-gray-800">Nome *</label>
              <Input
                placeholder="Nome completo"
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-800">Email *</label>
              <Input
                placeholder="email@example.com"
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-800">Telefone *</label>
              <Input
                placeholder="(11) 98765-4321"
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-800">
                Cargo Pretendido *
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue>Cozinha</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fdskjfals">afasdfasf</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-800">Disponibildiade *</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue>Cozinha</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fdskjfals">afasdfasf</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer">
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer">
              Cadastar Voluntário
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default NewVolunteer;
