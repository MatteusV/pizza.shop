import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSingIn(data: SignInForm) {
    try {
      toast.success('Enviamos um link de autenticação no seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSingIn(data),
        },
      })
    } catch {}
    toast.error('Credenciais invalidas.', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSingIn(data),
      },
    })
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8 ">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSingIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
