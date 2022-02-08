import dynamic from 'next/dynamic'
import path from 'path'

type ProjectNamespace = 'component' | 'modules' | 'lib' | 'public'

// const projectPath: Record<ProjectNamespace, string> = {
// 	component: path.join('./', 'components'),
// 	modules:path.resolve('./','modules/'),
// 	lib: path.join('./', 'lib'),
// 	public: path.join('./', 'public'),
// }
// console.log(path.resolve('./','components'),'>>>>>>>')
export const fetchComponent = (componentPath: string, namespace: ProjectNamespace) =>
	componentPath ? dynamic(() => import(path.join(namespace, componentPath)), { ssr: true }) : () => <div>Hello</div>
