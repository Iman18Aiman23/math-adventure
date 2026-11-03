# ImanAI / Math Adventure

A React learning app for children, with reading, speaking, mathematics, curriculum activities, assessments, and progress dashboards.

For the repository map, navigation model, shared layouts, and feature flows, see the [Project Structure and Layout guide](docs/PROJECT_STRUCTURE_AND_LAYOUT.md).

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Build and preview for production:**
    ```bash
    npm run build
    npm run preview
    ```

4.  **Check code style:**
    ```bash
    npm run lint
    ```

## Project References

- [Project Structure and Layout](docs/PROJECT_STRUCTURE_AND_LAYOUT.md)
- [UI/UX Documentation](docs/UI_UX_DOCUMENTATION.md)
- [Math KSSR reference](src/components/MatematikPage/MATEMATIK.md)
- [Pendidikan Islam reference](src/components/PendidikanIslamPage/PENDIDIKAN_ISLAM.md)
- [Bahasa Melayu reference](src/components/BahasaMelayuPage/BAHASA_MELAYU.md)

## Troubleshooting

### "File cannot be loaded because running scripts is disabled"

If you see this error when running `npm` commands on Windows PowerShell, it is due to the execution policy.

**Fix:**
Run the following command in PowerShell to allow scripts for your user:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Blank Screen when opening index.html

Modern web apps like this one cannot be run by double-clicking `index.html`. You **must** use a local server (like `npm run dev`) to view the application.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
