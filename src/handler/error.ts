import open from 'open';
import { Zyphra } from '../cli/core/init';
import { Banner } from '../ui/banner';
import { META, SUPPORT_URL } from '../constants';
import {
  intro,
  outro,
  select,
  isCancel,
  cancel
} from '@clack/prompts';

type ErrorAction = 'try_again' | 'restart' | 'support' | 'exit';

export async function handleError(
  error: Error,
  retryAction: () => Promise<void>
): Promise<void> {
  console.clear();

  new Banner({ x: 'center', y: 'top' }).setMeta(META);
  intro("hi");

  console.error(`\n❌ An error occurred: ${error.message}`);

  const action = await select<ErrorAction>({
    message: 'What would you like to do?',
    options: [
      { label: 'Try Again', value: 'try_again' },
      { label: 'Restart App', value: 'restart' },
      { label: 'Get Support', value: 'support' },
      { label: 'Exit', value: 'exit' }
    ]
  });

  if (isCancel(action)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  switch (action) {
    case 'try_again':
      await retryAction();
      break;
    case 'restart':
      await Zyphra.xyz();
      break;
    case 'support':
      await open(SUPPORT_URL);
      process.exit(0);
    case 'exit':
      process.exit(0);
  }

  outro('Returning to main menu…');
}
