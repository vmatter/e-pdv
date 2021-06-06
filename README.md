# E-PDV App (v1)

E-PDV is a POS using TypeScript, Nextjs, and react-stripe-js

Board Status:

[![Board Status](https://dev.azure.com/DEVIII2021/6f3d04ba-6de8-4fab-b27c-24fef227c9b6/8371c6d6-8191-4e65-b628-8427df26c063/_apis/work/boardbadge/cab0b06f-1f3e-4d90-b789-1c92421b1eb7?columnOptions=1)](https://dev.azure.com/DEVIII2021/6f3d04ba-6de8-4fab-b27c-24fef227c9b6/_boards/board/t/8371c6d6-8191-4e65-b628-8427df26c063/Microsoft.RequirementCategory/)

## Included

- [Emotion](https://emotion.sh/docs/introduction)
- [Material-UI](https://next.material-ui.com/)
- [NextJS](https://nextjs.org/)
- [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Stripe](https://stripe.com/)
- TypeScript

## How to run the project

Install the dependencies and start the development server.

```bash
yarn
yarn dev
```

To run tests you can run:

```bash
yarn test
```

## Required configuration to use Stripe

Copy the `.env.local.example` file into a file named `.env.local` in the root directory of this project:

```bash
cp .env.local.example .env.local
```

You will need a Stripe account ([register](https://dashboard.stripe.com/register)) to run this sample. Go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys and replace them in the `.env.local` file.

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

### Forward webhooks to your local dev server

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

Next, start the webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

### Setting up a live webhook endpoint

After deploying, copy the deployment URL with the webhook path (`https://your-url.now.sh/api/webhooks`) and create a live webhook endpoint [in your Stripe dashboard](https://stripe.com/docs/webhooks/setup#configure-webhook-settings).

Once created, you can click to reveal your webhook's signing secret. Copy the webhook secret (`whsec_***`) and add it as a new environment variable in your [Vercel Dashboard](https://vercel.com/dashboard):

- Select your newly created project.
- Navigate to the Settings tab.
- In the general settings scroll to the "Environment Variables" section.

After adding an environment variable you will need to rebuild your project for it to become within your code. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy".

### Demo data

The demo is running in test mode -- use `4242424242424242` as a test card number with any CVC + future expiration date.

Use the `4000000000003220` test card number to trigger a 3D Secure challenge flow.

Read more about testing on Stripe at https://stripe.com/docs/testing.
