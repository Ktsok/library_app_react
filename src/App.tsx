import { Route, Routes } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "sonner";
import HomePage from "../../../../../Users/tsoka/Desktop/library_app_react/src/pages/HomePage.tsx";
// import ProductListPage from "@/pages/ProductListPage.tsx";
// import ProductPage from "@/pages/ProductPage.tsx";
// import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Layout from "../../../../../Users/tsoka/Desktop/library_app_react/src/components/Layout.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import LoginPage from "../../../../../Users/tsoka/Desktop/library_app_react/src/pages/LoginPage.tsx";
// import ProtectedRoute from "@/components/ProtectedRoute.tsx";

function App() {


  return (
    <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="login" element={<LoginPage />} />

                        {/*<Route path="products" element={<ProtectedRoute />}>*/}
                        {/*    <Route index element={<ProductListPage />} />*/}
                        {/*    <Route path="new" element={<ProductPage mode="create" />} />*/}
                        {/*    <Route*/}
                        {/*        path=":productId"*/}
                        {/*        element={<ProductPage mode="edit" />}*/}
                        {/*    />*/}
                        {/*</Route>*/}

                        {/*<Route path="*" element={<NotFoundPage />} />*/}
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster richColors />
        </AuthProvider>
    </>
  )
}

export default App
