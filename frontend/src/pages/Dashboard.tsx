import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    id: "1",
    name: "Gregory House",
    timings: "09:00-17:00",
    speciality: "Diagnostics",
  },
  {
    id: "2",
    name: "James Wilson",
    timings: "09:00-17:00",
    speciality: "Neurology",
  },
  {
    id: "3",
    name: "Lisa Cuddy",
    timings: "Night Shift",
    speciality: "Pathology",
  },
];

export function Dashboard() {
  return (
    <>
      <Tabs defaultValue="table" className="w-full flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Details</CardTitle>
              {/* <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Sr. No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Speciality</TableHead>
                    <TableHead className="text-right">Timings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium ">
                        {invoice.id}
                      </TableCell>
                      <TableCell>Dr. {invoice.name}</TableCell>
                      <TableCell>{invoice.speciality}</TableCell>
                      <TableCell className="text-right">
                        {invoice.timings}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                </TableFooter> */}
              </Table>
            </CardContent>
            {/* <CardFooter>
              <Button>Save changes</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Badges</CardTitle>
              {/* <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
                {invoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardHeader className="font-medium flex justify-center items-center ">
                      {/* <div>{invoice.id}</div> */}
                      <div className="size-28 md:size-52 ring ring-border rounded-full">
                        {" "}
                      </div>
                      <CardTitle className="font-medium text-lg pt-4">
                        Dr. {invoice.name}
                      </CardTitle>
                      <CardDescription>{invoice.speciality}</CardDescription>
                    </CardHeader>
                    {/* <CardFooter className="text-right">
                      {invoice.timings}
                    </CardFooter> */}
                  </Card>
                ))}
              </div>
            </CardContent>
            {/* <CardFooter>
              <Button>Save password</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
